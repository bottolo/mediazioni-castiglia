import { create } from "zustand";

type ViewStore = {
	isDrawerOpen: boolean;
	setDrawerOpen: (data: boolean) => void;
};

export const useViewStore = create<ViewStore>((set) => ({
	isDrawerOpen: false,
	setDrawerOpen: (data) => set({ isSheetOpen: data }),
}));
