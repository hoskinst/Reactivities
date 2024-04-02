
using Domain;
using MediatR;
using Persistence;
using SQLitePCL;

namespace Application.Activities
{
    public class ActivityCreate
    {
        public class Command: IRequest 
        {
            public Activity Activity { get; set; }
        }

        public class Handler: IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }      
            public async Task Handle(Command command, CancellationToken cancellationToken)
            {
                _context.Add(command.Activity);

                await _context.SaveChangesAsync();                
            }
        }
    }
}