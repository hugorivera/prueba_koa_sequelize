module.exports = {
    /**
     *@api {post} /jobs
     *@apiGroup Jobs
     * @apiName createJob
     * @apiParam {String} [title] User must need to provide the job title
     * @apiParam {Number} [CompanyId] User must need to provide the CompanyId
     * @apiParamExample {String} Request Params :
     * {
     *  "title"  : "Node.js developer",
     *  "CompanyId" : 1
     * }
     * @apiSuccess {Object} Job  A newly created job object
     * @apiSuccessExample {json} Login Response:
     * {
     *  "id" : 1,
     *  "CompanyId" :1
     *  "title" : "Nodejs developer"
     * }
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/jobs
     * @apiDescription LoggedIn user can create new job
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     */
    async create(ctx){
        try {
            if (!ctx.request.body.title) {
                ctx.throw(400, 'Error en titulo')
            } 
            if (!ctx.request.body.CompanyId) {
                ctx.throw(400, 'Error en id')
            } 

            ctx.body = await ctx.db.Job.create({
                title: ctx.request.body.title,
                CompanyId: ctx.request.body.CompanyId
            });
        } catch (error) {
            ctx.throw(500, error)
        }
    },

    /**
     *@api {get} /jobs
     *@apiGroup Jobs
     * @apiName GetJobs
     * @apiSuccess {Object[]} Job  List of Jobs with Candidates
     * @apiExample {curl} Example usage:
     * curl -i http://localhost:4000/jobs
     * @apiDescription LoggedIn user can view all the jobs
     * @apiHeader {String} Authorization  JWT Authorization header
     * @apiHeaderExample {json} Request Authorization Header
     * {
     *  "authorization" : "jkahdkjashdk324324342"
     * }
     */
    async find(ctx){
        try {
            ctx.body = await ctx.db.Job.findAll({
                include: [
                    {
                        model : ctx.db.Candidate
                    }
                ]
            })
        } catch (error) {
            ctx.throw(500, error)
        }
    }
}