const customViewports = {
  deskTopDisplay: {
    name: 'Desktop Display',
    styles: {
      width: '1920px',
      height: '1080px',
    },
    type: 'desktop'
  },
  laptopDisplay: {
    name: 'Laptop Display',
    styles: {
      width: '1440px',
      height: '900px',
    },
    type: 'desktop'
  },
  mediumDisplay: {
    name: 'Medium Display',
    styles: {
      width: '992px',
      height: '600px',
    },
    type: 'tablet'
  },
  tabletDisplay: {
    name: 'Tablet Display',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet'
  }
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  layout: 'fullscreen',
  backgrounds: {
    values: [
      { name: 'light', value: '#fff' },
      { name: 'deep blue', value: '#102e4d' },
      { name: 'card background', value: 'rgba(0, 0, 0, 0.15)' },
    ],
  },
};

export const decorators = [
  (story) => ({
    components: { story },
    template: '<div style="position: relative;"><story /></div>',
  }),
];