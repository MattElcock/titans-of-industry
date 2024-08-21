export interface Organisation {
  id: string;
  name: string;
  type: string;
  wantedConnectionsCategories: string[];
  potentialOffersCategories: string[];
}

export interface Tag {
  id: string;
  name: string;
}
