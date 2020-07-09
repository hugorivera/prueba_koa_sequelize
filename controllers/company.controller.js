module.exports = {
    async create(ctx){
        try {
            ctx.body = await ctx.db.Company.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                address: ctx.request.body.address,
                UserId: ctx.state.user
            });

        }
        catch (err) {
            ctx.throw(500, err);
        }

    },
    async find(ctx){
        try {
            ctx.body = await ctx.db.Company.findAll({
                where:{
                    UserId: ctx.state.user,
                    include:[
                        {
                            model: ctx.db.Job
                        }
                    ]
                }
            });
        } catch (error) {
            ctx.throw(500, error);
        }
    },
    async findOne(ctx){
        try {
            const company = await ctx.db.Company.findOne({
                where: { id: ctx.params.id }
            });
            if(!company){
                ctx.throw(404, 'ID no valido');
            }
            ctx.body = company;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
    async destroy(ctx){
        try {
            const results = await ctx.db.Company.destroy({
                where: { id: ctx.params.id }
            });
            
            results === 0 ? ctx.throw(500, 'invalid id') : ctx.body = `company deleted with id ${ctx.params.id}`;
            
            ctx.body = results;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
    async update(ctx){
        try {
            const results = await ctx.db.Company.update({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                address: ctx.request.body.address
            },{
                where: { id: ctx.params.id }
            });
            
            results === 0 ? ctx.throw(500, 'invalid id') : ctx.body = `company updated with id ${ctx.params.id}`;
            
            ctx.body = results;
        } catch (error) {
            ctx.throw(500, error);
        }
    }
};