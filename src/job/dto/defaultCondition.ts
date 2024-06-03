export interface IDefaultCondition {
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