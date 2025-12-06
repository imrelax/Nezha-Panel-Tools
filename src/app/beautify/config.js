export const getConfigTemplate = (t) => ({
  title: t('defaults.title', 'beautify'),
  customFavicon: '',
  footerSlogan: '',
  freeAmount: t('defaults.freeAmount', 'beautify'),
  infinityCycle: t('defaults.infinityCycle', 'beautify'),
  buyBtnText: t('defaults.buyBtnText', 'beautify'),
  customBackgroundImage: '',
  lightBackground: false,
  showFireworks: true,
  showLantern: true,
  enableInnerSearch: true,
  listServerItemTypeToggle: true,
  listServerItemType: 'card',
  listServerStatusType: 'progress',
  listServerRealTimeShowLoad: false,
  detailServerStatusType: 'progress',
  simpleColorMode: false,
  serverStatusLinear: true,
  disableSarasaTermSC: true,
  hideWorldMap: false,
  hideHomeWorldMap: false,
  hideDetailWorldMap: false,
  homeWorldMapPosition: 'top',
  detailWorldMapPosition: 'top',
  hideNavbarServerCount: false,
  hideNavbarServerStat: false,
  hideListItemStatusDonut: false,
  hideListItemStat: false,
  hideListItemBill: false,
  hideFilter: false,
  hideTag: false,
  hideDotBG: false,
  monitorRefreshTime: 10,
  monitorChartType: 'multi',
  monitorChartTypeToggle: true,
  filterGPUKeywords: ['Virtual Display'],
  nezhaVersion: 'v0',
  apiMonitorPath: '/api/v1/monitor/{id}',
  wsPath: '/ws',
  nezhaPath: '/nezha/',
  nezhaV0ConfigType: 'servers',
  v1ApiMonitorPath: '/api/v1/service/{id}',
  v1WsPath: '/api/v1/ws/server',
  v1ApiGroupPath: '/api/v1/server-group',
  v1ApiSettingPath: '/api/v1/setting',
  v1ApiProfilePath: '/api/v1/profile',
  v1DashboardUrl: '/dashboard',
  v1HideNezhaDashboardBtn: false,
  routeMode: 'h5'
});

export const getFieldDefinitions = (t) => ({
  title: {
      label: t('fields.title.label', 'beautify'),
      placeholder: t('fields.title.placeholder', 'beautify'),
      remark: t('fields.title.remark', 'beautify'),
      type: 'input',
      v1customCode: true
  },
  customFavicon: {
      label: t('fields.customFavicon.label', 'beautify'),
      placeholder: t('fields.customFavicon.placeholder', 'beautify'),
      remark: t('fields.customFavicon.remark', 'beautify'),
      type: 'input',
      v1customCode: true,
      version: '0.5.7+'
  },
  footerSlogan: {
      label: t('fields.footerSlogan.label', 'beautify'),
      placeholder: t('fields.footerSlogan.placeholder', 'beautify'),
      remark: t('fields.footerSlogan.remark', 'beautify'),
      type: 'input',
      v1customCode: true,
      version: '0.5.2+'
  },
  freeAmount: {
      label: t('fields.freeAmount.label', 'beautify'),
      placeholder: t('fields.freeAmount.placeholder', 'beautify'),
      remark: t('fields.freeAmount.remark', 'beautify'),
      type: 'input',
      v1customCode: true
  },
  buyBtnText: {
      label: t('fields.buyBtnText.label', 'beautify'),
      placeholder: t('fields.buyBtnText.placeholder', 'beautify'),
      remark: t('fields.buyBtnText.remark', 'beautify'),
      type: 'input',
      v1customCode: true
  },
  infinityCycle: {
      label: t('fields.infinityCycle.label', 'beautify'),
      placeholder: t('fields.infinityCycle.placeholder', 'beautify'),
      remark: t('fields.infinityCycle.remark', 'beautify'),
      type: 'input',
      v1customCode: true
  },
  customBackgroundImage: {
      label: t('fields.customBackgroundImage.label', 'beautify'),
      placeholder: t('fields.customBackgroundImage.placeholder', 'beautify'),
      remark: t('fields.customBackgroundImage.remark', 'beautify'),
      type: 'input',
      v1customCode: true,
      version: '0.4.23+'
  },
  lightBackground: {
      label: t('fields.lightBackground.label', 'beautify'),
      type: 'switch',
      remark: t('fields.lightBackground.remark', 'beautify'),
      v1customCode: true,
      version: '0.4.23+'
  },
  showFireworks: {
      label: t('fields.showFireworks.label', 'beautify'),
      type: 'switch',
      remark: t('fields.showFireworks.remark', 'beautify'),
      v1customCode: true,
      version: '0.5.1+'
  },
  showLantern: {
      label: t('fields.showLantern.label', 'beautify'),
      type: 'switch',
      remark: t('fields.showLantern.remark', 'beautify'),
      v1customCode: true,
      version: '0.5.1+'
  },
  enableInnerSearch: {
      label: t('fields.enableInnerSearch.label', 'beautify'),
      type: 'switch',
      remark: t('fields.enableInnerSearch.remark', 'beautify'),
      v1customCode: true,
      version: '0.5.4+'
  },
  listServerItemTypeToggle: {
      label: t('fields.listServerItemTypeToggle.label', 'beautify'),
      type: 'switch',
      remark: t('fields.listServerItemTypeToggle.remark', 'beautify'),
      v1customCode: true,
      version: '0.5.0+'
  },
  listServerItemType: {
      label: t('fields.listServerItemType.label', 'beautify'),
      placeholder: t('fields.listServerItemType.placeholder', 'beautify'),
      remark: t('fields.listServerItemType.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.card', 'beautify'), value: 'card' },
          { label: t('options.row', 'beautify'), value: 'row' }
      ],
      v1customCode: true
  },
  listServerStatusType: {
      label: t('fields.listServerStatusType.label', 'beautify'),
      placeholder: t('fields.listServerStatusType.placeholder', 'beautify'),
      remark: t('fields.listServerStatusType.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.progress', 'beautify'), value: 'progress' },
          { label: t('options.donut', 'beautify'), value: 'donut' }
      ],
      v1customCode: true
  },
  listServerRealTimeShowLoad: {
      label: t('fields.listServerRealTimeShowLoad.label', 'beautify'),
      type: 'switch',
      remark: t('fields.listServerRealTimeShowLoad.remark', 'beautify'),
      v1customCode: true
  },
  detailServerStatusType: {
      label: t('fields.detailServerStatusType.label', 'beautify'),
      placeholder: t('fields.detailServerStatusType.placeholder', 'beautify'),
      remark: t('fields.detailServerStatusType.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.progress', 'beautify'), value: 'progress' },
          { label: t('options.donut', 'beautify'), value: 'donut' }
      ],
      v1customCode: true
  },
  simpleColorMode: {
      label: t('fields.simpleColorMode.label', 'beautify'),
      type: 'switch',
      remark: t('fields.simpleColorMode.remark', 'beautify'),
      v1customCode: true
  },
  serverStatusLinear: {
      label: t('fields.serverStatusLinear.label', 'beautify'),
      type: 'switch',
      remark: t('fields.serverStatusLinear.remark', 'beautify'),
      v1customCode: true
  },
  disableSarasaTermSC: {
      label: t('fields.disableSarasaTermSC.label', 'beautify'),
      type: 'switch',
      remark: t('fields.disableSarasaTermSC.remark', 'beautify'),
      v1customCode: true
  },
  hideWorldMap: {
      label: t('fields.hideWorldMap.label', 'beautify'),
      type: 'switch',
      remark: t('fields.hideWorldMap.remark', 'beautify'),
      v1customCode: true
  },
  hideHomeWorldMap: {
      label: t('fields.hideHomeWorldMap.label', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  hideDetailWorldMap: {
      label: t('fields.hideDetailWorldMap.label', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  homeWorldMapPosition: {
      label: t('fields.homeWorldMapPosition.label', 'beautify'),
      placeholder: t('fields.homeWorldMapPosition.placeholder', 'beautify'),
      remark: t('fields.homeWorldMapPosition.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.top', 'beautify'), value: 'top' },
          { label: t('options.bottom', 'beautify'), value: 'bottom' }
      ],
      v1customCode: true,
      version: '0.6.4+'
  },
  detailWorldMapPosition: {
      label: t('fields.detailWorldMapPosition.label', 'beautify'),
      placeholder: t('fields.detailWorldMapPosition.placeholder', 'beautify'),
      remark: t('fields.detailWorldMapPosition.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.top', 'beautify'), value: 'top' },
          { label: t('options.bottom', 'beautify'), value: 'bottom' }
      ],
      v1customCode: true,
      version: '0.6.4+'
  },
  hideNavbarServerCount: {
      label: t('fields.hideNavbarServerCount.label', 'beautify'),
      type: 'switch',
      remark: t('fields.hideNavbarServerCount.remark', 'beautify'),
      v1customCode: true
  },
  hideNavbarServerStat: {
      label: t('fields.hideNavbarServerStat.label', 'beautify'),
      type: 'switch',
      remark: t('fields.hideNavbarServerStat.remark', 'beautify'),
      v1customCode: true
  },
  hideListItemStatusDonut: {
      label: t('fields.hideListItemStatusDonut.label', 'beautify'),
      remark: t('fields.hideListItemStatusDonut.remark', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  hideListItemStat: {
      label: t('fields.hideListItemStat.label', 'beautify'),
      remark: t('fields.hideListItemStat.remark', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  hideListItemBill: {
      label: t('fields.hideListItemBill.label', 'beautify'),
      remark: t('fields.hideListItemBill.remark', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  hideFilter: {
      label: t('fields.hideFilter.label', 'beautify'),
      remark: t('fields.hideFilter.remark', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  hideTag: {
      label: t('fields.hideTag.label', 'beautify'),
      remark: t('fields.hideTag.remark', 'beautify'),
      type: 'switch',
      v1customCode: true
  },
  hideDotBG: {
      label: t('fields.hideDotBG.label', 'beautify'),
      type: 'switch',
      remark: t('fields.hideDotBG.remark', 'beautify'),
      v1customCode: true
  },
  monitorRefreshTime: {
      label: t('fields.monitorRefreshTime.label', 'beautify'),
      placeholder: t('fields.monitorRefreshTime.placeholder', 'beautify'),
      remark: t('fields.monitorRefreshTime.remark', 'beautify'),
      type: 'input',
      v1customCode: true,
      version: '0.4.8+'
  },
  monitorChartType: {
      label: t('fields.monitorChartType.label', 'beautify'),
      placeholder: t('fields.monitorChartType.placeholder', 'beautify'),
      remark: t('fields.monitorChartType.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.single', 'beautify'), value: 'single' },
          { label: t('options.multi', 'beautify'), value: 'multi' }
      ],
      v1customCode: true,
      version: '0.6.4+'
  },
  monitorChartTypeToggle: {
      label: t('fields.monitorChartTypeToggle.label', 'beautify'),
      type: 'switch',
      remark: t('fields.monitorChartTypeToggle.remark', 'beautify'),
      v1customCode: true,
      version: '0.6.4+'
  },
  filterGPUKeywords: {
      label: t('fields.filterGPUKeywords.label', 'beautify'),
      placeholder: t('fields.filterGPUKeywords.placeholder', 'beautify'),
      remark: t('fields.filterGPUKeywords.remark', 'beautify'),
      type: 'input-tag',
      v1customCode: true,
      version: '0.4.9+'
  },
  nezhaVersion: {
      label: t('fields.nezhaVersion.label', 'beautify'),
      placeholder: t('fields.nezhaVersion.placeholder', 'beautify'),
      remark: t('fields.nezhaVersion.remark', 'beautify'),
      type: 'select',
      options: [
          { label: t('options.v0', 'beautify'), value: 'v0' },
          { label: t('options.v1', 'beautify'), value: 'v1' }
      ]
  }
});
