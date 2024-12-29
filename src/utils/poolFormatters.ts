import { Pool, CombinedPool } from '@/types/pools';

export const formatPoolName = (poolName: string): string => {
  let [token1, token2] = poolName.split('/').map(t => t.trim().split(' ')[0]);
  
  // Ensure TON is always the quote token (second position)
  if (token1.toLowerCase() === 'ton') {
    [token1, token2] = [token2, token1];
  }
  
  return `${token1} / ${token2}`;
};

export const filterAndCombinePools = (pools: Pool[]): CombinedPool[] => {
  const filteredPools = pools.filter((pool: Pool) => {
    const poolName = pool.attributes.name.toLowerCase();
    return !(
      poolName.includes('usd₮') || 
      poolName.includes('usdt') ||
      poolName.includes('tether')
    );
  });

  const poolMap = new Map<string, CombinedPool>();
  
  filteredPools.forEach((pool: Pool) => {
    const pairKey = formatPoolName(pool.attributes.name);
    
    if (poolMap.has(pairKey)) {
      const existingPool = poolMap.get(pairKey)!;
      const existingVolume = parseFloat(existingPool.attributes.combined_volume_usd.h24);
      const newVolume = parseFloat(pool.attributes.volume_usd.h24);
      
      existingPool.attributes.combined_volume_usd.h24 = (existingVolume + newVolume).toString();
      existingPool.attributes.name = pairKey;
      
      // Keep the base token address from the pool with higher volume
      if (newVolume > existingVolume) {
        existingPool.attributes.base_token_address = pool.relationships.base_token.data.id;
      }
    } else {
      poolMap.set(pairKey, {
        ...pool,
        attributes: {
          ...pool.attributes,
          name: pairKey,
          combined_volume_usd: {
            h24: pool.attributes.volume_usd.h24
          },
          fee_tiers: [],
          base_token_address: pool.relationships.base_token.data.id
        }
      });
    }
  });

  return Array.from(poolMap.values());
}; 