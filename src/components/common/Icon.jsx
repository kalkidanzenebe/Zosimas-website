import {
  Brain,
  Building2,
  Cloud,
  Code,
  Compass,
  Database,
  GitBranch,
  Globe,
  Layout,
  LayoutGrid,
  Network,
  PenTool,
  Server,
  Share2,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';

const icons = {
  globe: Globe,
  smartphone: Smartphone,
  brain: Brain,
  code: Code,
  'pen-tool': PenTool,
  network: Network,
  cloud: Cloud,
  compass: Compass,
  layout: Layout,
  server: Server,
  sparkles: Sparkles,
  database: Database,
  'git-branch': GitBranch,
  workflow: Workflow,
  'layout-grid': LayoutGrid,
  'building-2': Building2,
  users: Users,
  'chart-network': Share2,
};

export function Icon({ name, className, strokeWidth = 1.6, ...props }) {
  const Component = icons[name] || Network;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
