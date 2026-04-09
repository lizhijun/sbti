# SBTI 人格测试

SBTI（Silly Behavioral Type Indicator）是一个轻松向的在线人格测试网站。通过 32 道题目，从自我认知、感情投入、行动方式和社交边界等日常状态出发，帮你看见自己更像哪一种人格。

## 特性

- 32 道测试题 + 隐藏饮酒分支
- 27 种人格类型，含详细描述和专属插画
- 15 维度评分系统（5 组人格切面 x 3 维度）
- 人格排行榜（Supabase 存储）
- 选中选项自动进入下一题

## 技术栈

- **Next.js 15** — App Router + React Server Components
- **Tailwind CSS v4** — 样式
- **TypeScript** — 类型安全
- **Supabase** — 排行榜数据存储

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

打开 http://localhost:3000 查看网站。

## 环境变量

排行榜功能需要配置 Supabase：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 项目结构

```
sbti/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── test/               # 测试页
│   ├── types/              # 27 种人格类型总览
│   ├── rankings/           # 人格排行榜
│   ├── about/              # 关于测试
│   ├── result/[type]/      # 人格结果详情页 x27
│   └── api/rankings/       # 排行榜提交 API
├── components/             # React 组件
│   ├── QuizFlow.tsx        # 测试流程核心组件
│   ├── Header.tsx          # 全局导航栏
│   └── Footer.tsx          # 全局页脚
├── lib/                    # 数据和逻辑
│   ├── questions.ts        # 32 道测试题数据
│   ├── types.ts            # 27 种人格类型数据
│   ├── dimensions.ts       # 15 维度定义 + H/M/L 解释
│   ├── scoring.ts          # 评分匹配算法
│   └── supabase.ts         # Supabase 客户端
└── public/images/types/    # 27 个人格插画
```

## 评分算法

1. 30 道常规题按维度求和，得到 15 个维度的原始分数
2. 每个维度：≤3 → L（低）、=4 → M（中）、≥5 → H（高）
3. 将用户的 15 维 pattern 与 25 个常规类型的 pattern 做距离匹配
4. 特殊规则：饮酒触发 → DRUNK；最高匹配 <60% → HHHH

## 五组人格切面

| 切面 | 维度 | 关注点 |
|------|------|--------|
| 自我模型 | S1 · S2 · S3 | 自尊自信、自我清晰度、核心价值 |
| 情感模型 | E1 · E2 · E3 | 依恋安全感、情感投入度、边界与依赖 |
| 态度模型 | A1 · A2 · A3 | 世界观倾向、规则与灵活度、人生意义感 |
| 行动驱力模型 | Ac1 · Ac2 · Ac3 | 动机导向、决策风格、执行模式 |
| 社交模型 | So1 · So2 · So3 | 社交主动性、人际边界感、表达与真实度 |

## 许可证

MIT
