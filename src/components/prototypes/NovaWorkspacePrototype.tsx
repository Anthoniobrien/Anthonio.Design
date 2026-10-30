import React, { useState } from 'react';
import { Terminal, Search, Layers, Box, Cpu, Sparkles, Check, ChevronRight, Sliders, CornerDownLeft } from 'lucide-react';

interface NovaWorkspacePrototypeProps {
  inspectionMode?: 'interactive' | 'hotspots' | 'redlines' | 'task';
  onTaskStepComplete?: (stepIndex: number) => void;
}

export const NovaWorkspacePrototype: React.FC<NovaWorkspacePrototypeProps> = ({
  inspectionMode = 'interactive',
  onTaskStepComplete,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-1');
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [commandQuery, setCommandQuery] = useState<string>('');
  const [componentState, setComponentState] = useState<'default' | 'hover' | 'active' | 'disabled'>('default');
  const [aiSynthesizing, setAiSynthesizing] = useState<boolean>(false);

  // Nodes in canvas
  const [nodes, setNodes] = useState([
    {
      id: 'node-1',
      title: 'Checkout Flow Redesign',
      type: 'UX Architecture',
      x: 20,
      y: 20,
      status: 'In Review',
      summary: 'Biometric passkeys reduced drop-off by 28%. Moving to component token handoff.'
    },
    {
      id: 'node-2',
      title: 'Design System Tokens',
      type: 'Token Library',
      x: 180,
      y: 70,
      status: 'Approved',
      summary: '60-30-10 palette tokens + 8pt spatial rhythm published to Figma & Tailwind.'
    },
    {
      id: 'node-3',
      title: 'AI Synthesis Node',
      type: 'Generative Intelligence',
      x: 50,
      y: 190,
      status: 'Live',
      summary: 'Continuous user interview clustering and automated sentiment scoring.'
    }
  ]);

  const commands = [
    { id: 'c1', label: 'Inspect Design Tokens', category: 'Design System', shortcut: '⌘T' },
    { id: 'c2', label: 'Synthesize User Journey Map', category: 'AI Intelligence', shortcut: '⌘J' },
    { id: 'c3', label: 'Export Production Redlines', category: 'Handoff', shortcut: '⌘E' },
    { id: 'c4', label: 'Switch to Dark High-Contrast Canvas', category: 'View', shortcut: '⌘D' }
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(commandQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const handleCommandSelect = (cmdId: string) => {
    if (cmdId === 'c1') {
      setSelectedNodeId('node-2');
      if (onTaskStepComplete) {
        onTaskStepComplete(1);
      }
    } else if (cmdId === 'c2') {
      setAiSynthesizing(true);
      setTimeout(() => setAiSynthesizing(false), 800);
    }
    setIsCommandOpen(false);
    setCommandQuery('');
  };

  const handleOpenCommand = () => {
    setIsCommandOpen(true);
    if (onTaskStepComplete) {
      onTaskStepComplete(0);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-950 text-neutral-100 font-sans select-none overflow-hidden relative">
      {/* Top Nova App Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
            N
          </div>
          <span className="font-semibold text-xs text-white">Nova Spatial Canvas</span>
          <span className="text-[10px] text-neutral-400 font-mono">v3.2</span>
        </div>

        {/* Command trigger */}
        <button
          type="button"
          onClick={handleOpenCommand}
          data-hotspot="Open Command Palette (⌘K)"
          data-spec="Command Bar · Trigger: Cmd+K · Latency: <50ms"
          className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[11px]">Command</span>
          <span className="font-mono text-[10px] bg-neutral-900 px-1 py-0.5 rounded text-neutral-400 border border-neutral-700">
            ⌘K
          </span>
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative design-grid-pattern p-4 overflow-y-auto">
        {/* Spatial Cards */}
        <div className="space-y-3">
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                data-hotspot={`Canvas Node: ${node.title}`}
                data-spec={`Spatial Node Card · Radius: 12px · Selected: ${isSelected}`}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer backdrop-blur-sm ${
                  isSelected
                    ? 'bg-neutral-900/95 border-violet-500 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/50'
                    : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-violet-400">
                    {node.type}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                    {node.status}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-white mt-1">{node.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{node.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Live Token & Component Anatomy Inspector (Bottom dock when node-2 selected) */}
        {selectedNodeId === 'node-2' && (
          <div
            className="mt-4 p-3.5 bg-neutral-900 rounded-xl border border-violet-500/60 shadow-xl space-y-3 animate-in fade-in duration-150"
            data-spec="Design Token Inspector Dock · Anatomy Viewer"
            data-hotspot="Interactive Token Inspector"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-violet-400" />
                Button Component Anatomy
              </span>
              <span className="text-[10px] font-mono text-emerald-400">WCAG AAA: 8.4:1 Pass</span>
            </div>

            {/* State Switcher */}
            <div className="grid grid-cols-4 gap-1 p-0.5 bg-neutral-950 rounded-lg border border-neutral-800">
              {(['default', 'hover', 'active', 'disabled'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setComponentState(st);
                    if (onTaskStepComplete) onTaskStepComplete(2);
                  }}
                  className={`py-1 text-[11px] rounded capitalize transition-colors ${
                    componentState === st
                      ? 'bg-violet-600 text-white font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Rendered Live Component */}
            <div className="py-2.5 px-3 bg-neutral-950 rounded-lg flex items-center justify-between border border-neutral-800">
              <span className="text-[11px] text-neutral-400 font-mono">Render Preview:</span>
              <button
                type="button"
                disabled={componentState === 'disabled'}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  componentState === 'default'
                    ? 'bg-violet-600 text-white'
                    : componentState === 'hover'
                    ? 'bg-violet-500 text-white shadow-md shadow-violet-900/50 scale-[1.02]'
                    : componentState === 'active'
                    ? 'bg-violet-700 text-neutral-200 scale-[0.98]'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                Continue Workflow
              </button>
            </div>

            <div className="text-[10px] text-neutral-400 font-mono flex justify-between pt-1 border-t border-neutral-800">
              <span>Token: var(--color-action-violet)</span>
              <span>Padding: py-2 px-4 (1:2 ratio)</span>
            </div>
          </div>
        )}
      </div>

      {/* Command Palette Modal */}
      {isCommandOpen && (
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-40 p-4 flex flex-col justify-start pt-10">
          <div className="bg-neutral-900 rounded-xl border border-neutral-700 shadow-2xl overflow-hidden max-w-sm mx-auto w-full animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 p-3 border-b border-neutral-800">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type command or search tokens..."
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsCommandOpen(false)}
                className="text-[10px] font-mono text-neutral-400 hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="max-h-56 overflow-y-auto p-1.5 space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => handleCommandSelect(cmd.id)}
                    className="w-full text-left p-2 rounded-lg hover:bg-neutral-800 flex items-center justify-between text-xs text-neutral-200 transition-colors group cursor-pointer"
                  >
                    <div>
                      <div className="font-medium group-hover:text-white">{cmd.label}</div>
                      <div className="text-[10px] text-neutral-400">{cmd.category}</div>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                      {cmd.shortcut}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-neutral-400">No matching commands</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
