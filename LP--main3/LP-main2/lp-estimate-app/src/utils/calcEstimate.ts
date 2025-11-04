import { basePackages, designIntensityLabels, designIntensityMultipliers, options, taxRate } from '@/data/tariffs';
import type { EstimateBreakdown, EstimateFormValues, EstimateLineItem } from '@/types/estimate';

const toCurrency = (value: number) => Math.round(value);

export const calculateEstimate = (values: EstimateFormValues): EstimateBreakdown => {
  const items: EstimateLineItem[] = [];
  const basePackage = basePackages.find((pkg) => pkg.code === values.basePackage);

  if (!basePackage) {
    throw new Error(`Unknown base package: ${values.basePackage}`);
  }

  // 新規作成か再作成かで価格を切り替え
  const isRenewal = values.projectType === 'renewal';
  // 基本料金は0円（デフォルト） - 追加オプション選択時に料金が発生
  const basePrice = 0;

  // 基本想定ページ数はパッケージのデフォルト値を使用（固定）
  const effectiveIncludedPages = basePackage.includedPages;

  const projectTypeLabel = isRenewal ? '再作成' : '新規作成';
  items.push({
    code: basePackage.code,
    label: `${basePackage.name}（${projectTypeLabel}・基本${effectiveIncludedPages}ページ含む）`,
    unitAmount: basePrice,
    quantity: 1,
    total: basePrice,
    category: 'サイトテンプレート',
  });

  const extraPages = Math.max(0, values.pageCount - effectiveIncludedPages);
  if (extraPages > 0) {
    const price = basePackage.additionalPageUnitPrice;
    items.push({
      code: 'additional_pages',
      label: `追加ページ（${extraPages}ページ）`,
      unitAmount: price,
      quantity: extraPages,
      total: price * extraPages,
      category: 'ボリューム調整',
    });
  }

  let runningSubtotal = items.reduce((acc, item) => acc + item.total, 0);

  const intensityMultiplier = designIntensityMultipliers[values.designIntensity];
  if (intensityMultiplier > 1) {
    const upcharge = toCurrency(runningSubtotal * (intensityMultiplier - 1));
    if (upcharge > 0) {
      items.push({
        code: `design_${values.designIntensity}`,
        label: `デザイン強化 (${designIntensityLabels[values.designIntensity]})`,
        unitAmount: upcharge,
        quantity: 1,
        total: upcharge,
        category: 'クリエイティブ',
      });
      runningSubtotal += upcharge;
    }
  }

  // 基本料金に含まれるオプションを取得
  const includedOptions = isRenewal ? basePackage.includedOptions.renewal : basePackage.includedOptions.new;
  
  const selectedOptionEntities = values.selectedOptions
    .map((code) => options.find((opt) => opt.code === code))
    .filter((opt): opt is NonNullable<typeof opt> => Boolean(opt));

  // 基本料金に含まれるオプションを明示的に表示
  includedOptions.forEach((optionCode) => {
    const option = options.find((opt) => opt.code === optionCode);
    if (option) {
      items.push({
        code: option.code,
        label: `${option.name}（基本料金に含まれる）`,
        unitAmount: 0, // 追加料金なし
        quantity: 1,
        total: 0,
        category: '基本料金に含まれる',
        source: option.category,
      });
    }
  });

  // 基本料金に含まれないオプションのみ追加料金として計算
  selectedOptionEntities.forEach((option) => {
    // 基本料金に含まれるオプションは追加料金として計算しない
    if (includedOptions.includes(option.code)) {
      return;
    }

    let quantity = 1;

    if (option.code === 'multilingual') {
      quantity = Math.max(1, values.multilingualCount || 1);
    }
    
    if (option.code === 'multilingual_design_adjustment') {
      quantity = Math.max(1, values.multilingualCount || 1);
    }

    let total = option.price * quantity;
    let label = option.unit === 'per_language' ? `${option.name} × ${quantity}言語` : option.name;
    let unitAmount = option.price;
    
    // アニメーション演出（カスタム）とサイト設計（IA/ワイヤー）- カスタムはデザイン制作（カスタム）に含まれるため
    // 個別選択された場合は無視（デザイン制作カスタムが選択されていない場合のみ表示されるべき）
    if (option.code === 'animation_custom' || option.code === 'information_architecture_custom') {
      // デザイン制作（カスタム）が選択されている場合は、これらのオプションは含まれているため計算しない
      if (values.selectedOptions.includes('visual_design_custom')) {
        return;
      }
    }
    
    // デザイン制作（キービジュアル/パターン）- カスタムの場合は価格範囲を表示
    // サイト設計（IA/ワイヤー）カスタムとアニメーション演出（カスタム）を含む
    if (option.code === 'visual_design_custom') {
      label = `${option.name}（¥50,000〜¥200,000）【サイト設計（IA/ワイヤー）カスタム・アニメーション演出（カスタム）を含む】`;
      total = 125000; // 中間値として¥125,000を計算に使用
      unitAmount = 125000;
    }
    
    // 構成・デザインの多言語調整はページ数に応じて料金を計算
    if (option.code === 'multilingual_design_adjustment') {
      const pageCount = values.pageCount || 1;
      let pricePerLanguage = 0;
      let priceRange = '';
      
      // ページ数に応じた料金設定（最小値¥40,000〜最大値¥200,000の範囲）
      // 1ページ: ¥40,000〜¥80,000 → 中間値¥60,000
      // 5ページ: ¥40,000〜¥100,000 → 中間値¥70,000
      // 8ページ: ¥60,000〜¥120,000 → 中間値¥90,000
      // 15ページ: ¥80,000〜¥200,000 → 中間値¥140,000
      if (pageCount === 1) {
        pricePerLanguage = 60000; // ¥40,000〜¥80,000の中間値
        priceRange = '¥40,000〜¥80,000';
      } else if (pageCount === 5) {
        pricePerLanguage = 70000; // ¥40,000〜¥100,000の中間値
        priceRange = '¥40,000〜¥100,000';
      } else if (pageCount === 8) {
        pricePerLanguage = 90000; // ¥60,000〜¥120,000の中間値
        priceRange = '¥60,000〜¥120,000';
      } else if (pageCount >= 15) {
        pricePerLanguage = 140000; // ¥80,000〜¥200,000の中間値（15ページ以上）
        priceRange = '¥80,000〜¥200,000';
      } else if (pageCount <= 4) {
        // 2〜4ページ: 1ページと5ページの間を線形補間
        pricePerLanguage = Math.round(60000 + (pageCount - 1) * 2500);
        const max = Math.round(pageCount * 25000);
        priceRange = `¥40,000〜¥${max.toLocaleString()}`;
      } else if (pageCount <= 9) {
        // 6〜9ページ: 5ページと8ページの間を線形補間
        if (pageCount <= 7) {
          pricePerLanguage = Math.round(70000 + (pageCount - 5) * 10000);
        } else {
          pricePerLanguage = Math.round(90000 + (pageCount - 8) * 25000);
        }
        const min = Math.round(40000 + (pageCount - 5) * 5000);
        const max = Math.round(100000 + (pageCount - 5) * 5000);
        priceRange = `¥${min.toLocaleString()}〜¥${max.toLocaleString()}`;
      } else {
        // 10〜14ページ: 8ページと15ページの間を線形補間
        pricePerLanguage = Math.round(90000 + (pageCount - 8) * 7143);
        const min = Math.round(60000 + (pageCount - 8) * 2857);
        const max = Math.round(120000 + (pageCount - 8) * 11429);
        priceRange = `¥${min.toLocaleString()}〜¥${max.toLocaleString()}`;
      }
      
      total = pricePerLanguage * quantity;
      // 言語数も考慮した総額範囲を表示（最小値¥40,000〜最大値¥200,000）
      const totalMin = Math.max(Math.round(pageCount === 1 ? 40000 : pageCount <= 4 ? 40000 : pageCount <= 9 ? 40000 + (pageCount - 5) * 5000 : 60000 + (pageCount - 8) * 2857) * quantity, 40000 * quantity);
      const totalMax = Math.min(Math.round(pageCount === 1 ? 80000 : pageCount <= 4 ? pageCount * 25000 : pageCount <= 9 ? 100000 + (pageCount - 5) * 5000 : 120000 + (pageCount - 8) * 11429) * quantity, 200000 * quantity);
      const perLanguageHint = priceRange ? `／1言語あたり${priceRange}` : '';
      label = `${option.name} × ${quantity}言語（¥${totalMin.toLocaleString()}〜¥${totalMax.toLocaleString()}${perLanguageHint}・${pageCount}ページ想定）`;
      unitAmount = pricePerLanguage;
    }
    
    items.push({
      code: option.code,
      label,
      unitAmount,
      quantity,
      total,
      category: 'オプション',
      source: option.category,
    });
  });

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const computedTax = toCurrency(subtotal * taxRate);
  const totalWithTax = subtotal + computedTax;
  const totalWithoutTax = subtotal;

  return {
    subtotal,
    tax: computedTax,
    totalWithoutTax,
    totalWithTax,
    displayTotal: values.includeTax ? totalWithTax : totalWithoutTax,
    taxRate,
    currency: 'JPY',
    items,
  };
};
