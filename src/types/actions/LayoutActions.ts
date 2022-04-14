
type ToggerSidebarAction = {
    type: 'TOGGLE_SIDEBAR' | 'GET_SIDEBAR_STATE';
    state: boolean;
};

type ToggleUserMenuAction = {
    type: 'TOGGLE_USER_MENU';
    state: boolean;
};

export type LayoutActions = ToggerSidebarAction | ToggleUserMenuAction;