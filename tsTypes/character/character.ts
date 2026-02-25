/**
 * 角色
 */
export interface Character {
    name: string;
    description: string[];
}

/**
 * 角色组
 */
export interface CharacterGroup {
    title: string;
    character: Character[];
}

/**
 * 角色列表
 */
export type Characters = Record<string, CharacterGroup>;
