export const ASSET_BASE = '/assets/uiassets1'

export const assetPath = {
  button: {
    deploy: (state: 'base' | 'hover' | 'pressed' | 'disabled' | 'active_armed' = 'base') =>
      `${ASSET_BASE}/buttons/deploy_button/deploy_button__${getStateIndex(state, 5)}__${state}.jpeg`,
    abort: (state: 'base' | 'hover' | 'pressed' | 'disabled' | 'critical_alert' = 'base') =>
      `${ASSET_BASE}/buttons/abort_button/abort_button__${getStateIndex(state, 5)}__${state}.jpeg`,
    acquire: (state: 'base' | 'hover' | 'pressed' | 'disabled' | 'reward_ready' = 'base') =>
      `${ASSET_BASE}/buttons/acquire_button/acquire_button__${getStateIndex(state, 5)}__${state}.jpeg`,
    settings: (state: 'base' | 'hover' | 'pressed' | 'disabled' | 'open_active' = 'base') =>
      `${ASSET_BASE}/buttons/settings_button/settings_button__${getStateIndex(state, 5)}__${state}.jpeg`,
    upgrade: (state: 'base' | 'hover' | 'pressed' | 'disabled' | 'available_ready' = 'base') =>
      `${ASSET_BASE}/buttons/upgrade_button/upgrade_button__${getStateIndex(state, 5)}__${state}.jpeg`,
    logout: (state: 'base' | 'hover' | 'pressed' | 'disabled' = 'base') =>
      `${ASSET_BASE}/buttons/logout_button/logout_button__${getStateIndex(state, 4)}__${state}.jpeg`,
  },
  hudElement: {
    healthBar: (state: 'base' | 'empty' | 'low' | 'half_full' | 'full' | 'critical_warning' | 'damaged_frame' = 'base') =>
      `${ASSET_BASE}/hud_elements/health_bar_frame/health_bar_frame__${getStateIndex(state, 7)}__${state}.jpeg`,
    shieldBar: (state: 'base' | 'empty' | 'low' | 'half_full' | 'full' | 'overcharged' | 'broken' = 'base') =>
      `${ASSET_BASE}/hud_elements/shield_bar_frame/shield_bar_frame__${getStateIndex(state, 7)}__${state}.jpeg`,
    waveCounter: (state: 'base' | 'idle' | 'active' | 'warning' | 'critical_final_wave' | 'broken' = 'base') =>
      `${ASSET_BASE}/hud_elements/wave_counter_frame/wave_counter_frame__${getStateIndex(state, 6)}__${state}.jpeg`,
    speedometer: (state: 'base' | 'idle' | 'low_speed' | 'mid_speed' | 'high_speed' | 'nitro_maxed' | 'broken' = 'base') =>
      `${ASSET_BASE}/hud_elements/speedometer_frame/speedometer_frame__${getStateIndex(state, 7)}__${state}.jpeg`,
    abilitySlot: (state: 'base' | 'empty' | 'hover' | 'selected' | 'cooldown' | 'locked' | 'ready_charged' = 'base') =>
      `${ASSET_BASE}/hud_elements/ability_slot/ability_slot__${getStateIndex(state, 7)}__${state}.jpeg`,
  },
  icon: {
    scrap: (state: 'base' | 'highlighted' | 'disabled' = 'base') =>
      `${ASSET_BASE}/icons/scrap_icon/scrap_icon__${getStateIndex(state, 3)}__${state}.jpeg`,
    tech: (state: 'base' | 'highlighted' | 'disabled' = 'base') =>
      `${ASSET_BASE}/icons/tech_parts_icon/tech_parts_icon__${getStateIndex(state, 3)}__${state}.jpeg`,
    ammo: (state: 'base' | 'highlighted' | 'disabled' | 'rare_explosive' = 'base') =>
      `${ASSET_BASE}/icons/ammo_icon/ammo_icon__${getStateIndex(state, 4)}__${state}.jpeg`,
    nitro: (state: 'base' | 'highlighted' | 'disabled' | 'boost_ready' = 'base') =>
      `${ASSET_BASE}/icons/nitro_icon/nitro_icon__${getStateIndex(state, 4)}__${state}.jpeg`,
    skill: (state: 'base' | 'highlighted' | 'disabled' | 'legendary' = 'base') =>
      `${ASSET_BASE}/icons/skill_star/skill_star__${getStateIndex(state, 4)}__${state}.jpeg`,
    checkmark: (state: 'base' | 'hover' | 'pressed' | 'disabled' | 'success_flash' = 'base') =>
      `${ASSET_BASE}/icons/confirm_checkmark/confirm_checkmark__${getStateIndex(state, 5)}__${state}.jpeg`,
    backArrow: (state: 'base' | 'hover' | 'pressed' | 'disabled' = 'base') =>
      `${ASSET_BASE}/icons/back_arrow/back_arrow__${getStateIndex(state, 4)}__${state}.jpeg`,
  },
  menuFrame: {
    main: (state: 'base' | 'focused' | 'alert' | 'disabled_offline' | 'damaged' = 'base') =>
      `${ASSET_BASE}/menu_frames/main_menu_frame/main_menu_frame__${getStateIndex(state, 5)}__${state}.jpeg`,
    dialog: (state: 'base' | 'focused' | 'warning' | 'disabled' | 'damaged' = 'base') =>
      `${ASSET_BASE}/menu_frames/small_dialog_frame/small_dialog_frame__${getStateIndex(state, 5)}__${state}.jpeg`,
  },
}

function getStateIndex(state: string, totalStates: number): string {
  if (state && totalStates) return '01'
  return '01'
}
