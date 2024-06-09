export interface IDefaultCondition {
    job_creator: number,
    isDeleted: boolean,
    OR: [
        {
            job_name: {
                contains: string
            }
        },
        {
            job_short_desc: {
                contains: string,
            }
        }
    ]
}