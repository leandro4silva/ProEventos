using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistencia.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Persistencia
{
    public class PalestrantePersist : IPalestrantePersist
    {
        private readonly ProEventosContext _context;

        public PalestrantePersist(ProEventosContext context)
        {
            this._context = context;
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(pe => pe.RedeSociais);

            if (includeEventos)
            {
                query = query.Include(pe => pe.PalestranteEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.OrderBy(pe => pe.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos=false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(pe => pe.RedeSociais);

            if (includeEventos)
            {
                query = query.Include(pe => pe.PalestranteEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.OrderBy(pe => pe.Nome).Where(pe=>pe.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }


        public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos=false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.
                Include(pe => pe.RedeSociais);

            if(includeEventos)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(e=>e.Evento);
            }

            query = query.Where(pe => pe.Id == palestranteId);

            return await query.FirstOrDefaultAsync();
        }
    }
}
