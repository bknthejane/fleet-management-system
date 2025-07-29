using Abp.Application.Services;
using FleetManagementSystem.MultiTenancy.Dto;

namespace FleetManagementSystem.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

