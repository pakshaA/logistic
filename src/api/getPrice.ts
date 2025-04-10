interface PackageState {
    package: {
      width: string;
      height: string;
      length: string;
      weight: string;
      id: string
    };
    isGoods: boolean;
    typeOfGoods: string;
  }

export const getPrice = async (distance: number, packageInfo: PackageState) => {
    const p = packageInfo
    const d = distance
    const PRICE_PER_KM = 0.4
    const PRICE_PER_KM_GOODS = 0.6
    const prices: Record<string, number> = {
      'envelope': 100,
      'box_xs': 200,
      'box_s': 300,
      'box_m': 400,
      'box_l': 500,
      'box_xl': 600,
      'suitcase': 700,
      'pallet': 800,
      'custom': 900
    }
    const PRICES: Record<string, number> = {
      'perishable': 1500,
      'frozen': 400,
      'non_perishable': 300,
      'fresh': 500,
      'bakery': 2000
    };
    
    if (!p.isGoods) {
        return d * PRICE_PER_KM + prices[p.package.id];
    }

    return d * PRICE_PER_KM_GOODS + PRICES[p.typeOfGoods]
}