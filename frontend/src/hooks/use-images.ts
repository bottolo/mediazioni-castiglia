import { api } from "@/lib/api";
import type { Image } from "@backend/routes/types/awards";
import { useQuery } from "@tanstack/react-query";

type UseImagesProps = {
	queryKeys: string[];
	folder: string;
};

export function useImages({ queryKeys, folder }: UseImagesProps) {
	return useQuery({
		queryKey: [...queryKeys, folder],
		queryFn: async () => {
			try {
				const response = await api.mega.images.$get({
					query: { folder },
				});
				const data = await response.json();
				if (!Array.isArray(data)) {
					console.error("Expected array response, got:", data);
					return [];
				}
				return data as Image[];
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(`Failed to fetch awards: ${error.message}`);
				}
				throw new Error("Failed to fetch awards");
			}
		},
		staleTime: 5 * 60 * 1000,
	});
}
