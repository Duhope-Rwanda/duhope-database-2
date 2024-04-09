/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl';
import { SidebarMenuItem } from './SidebarMenuItem';

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({
          id: 'MENU.DASHBOARD'
        })}
        fontIcon="bi-app-indicator"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Apps
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/apps/categories"
        icon="abstract-28"
        title="Categories"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/apps/groups"
        icon="abstract-28"
        title="Groups"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/apps/list/cohorts"
        icon="abstract-28"
        title="Cohorts"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/apps/orders"
        icon="abstract-28"
        title="Orders"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/apps/products"
        icon="abstract-28"
        title="Products"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/apps/list/women"
        icon="abstract-28"
        title="Women List"
        fontIcon="bi-layers"
      />
    </>
  );
};

export { SidebarMenuMain };
