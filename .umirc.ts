import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  webpack5: {},
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/layout/index',
      routes: [
        {
          path: '/student',
          component: '@/pages/student/index',
        },
        {
          path: '/teacher',
          component: '@/pages/teacher/index',
        },
        {
          path: '/course',
          component: '@/pages/course/index',
        },
        {
          path: '/resource',
          component: '@/pages/resource/index',
        },
      ],
    },
  ],
  title: '选课后台管理系统',
  fastRefresh: {},
  mfsu: {},
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed',
  },
});
