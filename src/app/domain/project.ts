export interface Project {
    id: number,
    idProductOwner: number,
    idScrumMaster: number,
    name: string,
    deadLine: Date,
    description: string,
    repositoryUrl: string,
    status: number
}
