using Microsoft.AspNetCore.Mvc;
using DevPathTracker.Server.Models;

namespace DevPathTracker.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MilestonesController : ControllerBase
{
    // Lista estática para que los datos persistan mientras el proceso esté vivo
    private static List<Milestone> _milestones = new()
    {
        new Milestone(1, "Entender Componentes en React", "Frontend", "Completed", DateTime.Now.AddDays(-2)),
        new Milestone(2, "Configurar API en .NET 8", "Backend", "In Progress", DateTime.Now),
        new Milestone(3, "Aprender Deployment en Azure SWA", "DevOps", "Pending", DateTime.Now)
    };

    [HttpGet]
    public IActionResult Get() => Ok(_milestones);

    [HttpPost]
    public IActionResult Post(Milestone newMilestone)
    {
        // Generación simple de ID
        var id = _milestones.Any() ? _milestones.Max(m => m.Id) + 1 : 1;
        var milestone = newMilestone with { Id = id, Date = DateTime.Now };
        
        _milestones.Add(milestone);
        return CreatedAtAction(nameof(Get), new { id = milestone.Id }, milestone);
    }
}