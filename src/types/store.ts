export interface DriveFolder {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  folderId: string;
  folderName: string;
  imageUrl: string;
  thumbnailUrl: string;
  driveFileId?: string;
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  description?: string;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface CatalogResponse {
  success: boolean;
  isDemo: boolean;
  folders: DriveFolder[];
  products: Product[];
  totalProducts: number;
  error?: string;
  rootFolderId?: string;
}

export interface DriveConfig {
  apiKey: string;
  rootFolderId: string;
}
