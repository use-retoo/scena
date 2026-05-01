import { ComponentSize } from '@/shared/enums';
import type { ScenaProgressComponentThickness } from '@/shared/ui/scena-progress';

export const scenaProgressLineThicknessMap: ScenaProgressComponentThickness = {
	[ComponentSize.XS]: {
		default: 3,
		hover: 5
	},
	[ComponentSize.SM]: {
		default: 4,
		hover: 5
	},
	[ComponentSize.MD]: {
		default: 4,
		hover: 6
	},
	[ComponentSize.LG]: {
		default: 5,
		hover: 7
	},
	[ComponentSize.XL]: {
		default: 6,
		hover: 8
	},
	[ComponentSize.XXL]: {
		default: 7,
		hover: 9
	}
};

export const scenaProgressCircleThicknessMap: ScenaProgressComponentThickness = {
	[ComponentSize.XS]: {
		default: 4,
		hover: 6
	},
	[ComponentSize.SM]: {
		default: 4,
		hover: 6
	},
	[ComponentSize.MD]: {
		default: 4,
		hover: 8
	},
	[ComponentSize.LG]: {
		default: 6,
		hover: 8
	},
	[ComponentSize.XL]: {
		default: 8,
		hover: 10
	},
	[ComponentSize.XXL]: {
		default: 8,
		hover: 12
	}
};
