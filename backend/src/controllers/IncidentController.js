const connection = require('../database/connection');

module.exports = {

  async index(req, res){
    // Conta o total dos casos 
    const [count] = await connection('incidents').count() 
    // retorna um array, entao desestrutura ou count[0] p/ mostrar o valor
    console.log(count);

    const { page = 1 } = req.query;

    // Pagination:retorna 5 Casos por pagina
    const incidents = await connection('incidents')
      // join() vai juntar os dados da ong na listagem dos casos
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset(( page - 1) * 5)
      .select([
       'incidents.*',
       'ongs.name',
       'ongs.email',
       'ongs.whatsapp',
       'ongs.city',
       'ongs.uf'
      ]);

    /* Return the count value on the header based on the count(*) */
      res.header('X-Total-Count', count['count(*']);

    // const incidents = await connection('incidents').select('*')

    return res.json(incidents)
  },


  async create(req, res){

    const { title, description, value } = req.body;

    const ong_id = req.headers.authorization;

   const [ id ] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
    
    return res.json({ id })
  },

  async delete(req, res){
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

      if(incident.ong_id !== ong_id){
        return res.status(401).json({error: 'Operation not Permitted'})
      }
      await connection('incidents').where('id', id).delete();
      return res.status(204).send()
  }
}