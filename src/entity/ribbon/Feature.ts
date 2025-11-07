export interface Feature {
    title: string
    icon: string
    action: () => void;
    size: SIZE_ICON_FEATURE
}

export type SIZE_ICON_FEATURE = 'FULL' | 'MINI'