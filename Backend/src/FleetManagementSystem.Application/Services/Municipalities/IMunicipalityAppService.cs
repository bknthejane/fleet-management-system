using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Services.Municipalities.Dto;

namespace FleetManagementSystem.Services.Municipalities
{
    public interface IMunicipalityAppService : IApplicationService
    {
        Task<MunicipalityDto> GetAsync(Guid id);
        Task<MunicipalityDto> CreateAsync(CreateMunicipalityDto input);
        Task<MunicipalityDto> UpdateAsync(UpdateMunicipalityDto input);
        Task DeleteAsync(Guid id);
    }
}
