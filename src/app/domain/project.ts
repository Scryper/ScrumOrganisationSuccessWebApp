export interface Project {
    id: number,
    idProductOwner: number,
    idScrumMaster: number,
    name: string,
    deadline: Date,
    description: string,
    repositoryUrl: string,
    status: number
}
