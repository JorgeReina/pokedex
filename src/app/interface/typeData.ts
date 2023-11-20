export interface TypeData {
  name: string;
  effectiveness: {
    strongAgainst: string[];
    weakAgainst: string[];
    notEffectiveAgainst: string[];
    resistantTo: string[];
    immuneTo: string[];
  };
}