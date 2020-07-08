const { find } = require("./company.controller");

module.exports = {
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
            tx.throw(500, error)
        }
    }
}