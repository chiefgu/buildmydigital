'use client';

export default function FlowDiagram() {
  const flowSteps = [
    {
      label: 'Website/Funnels',
      sublabel: 'Foundation',
      gradient: 'from-[#EF8354] to-[#d97446]',
      delay: '0s'
    },
    {
      label: 'Leads',
      sublabel: 'Fuel',
      gradient: 'from-pink-400 to-pink-500',
      delay: '0.1s'
    },
    {
      label: 'Automation',
      sublabel: 'Nurture',
      gradient: 'from-purple-400 to-purple-500',
      delay: '0.2s'
    },
    {
      label: 'Closers',
      sublabel: 'Convert',
      gradient: 'from-blue-400 to-blue-500',
      delay: '0.3s'
    },
    {
      label: '£ Revenue',
      sublabel: 'Outcome',
      gradient: 'from-green-400 to-green-500',
      delay: '0.4s'
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      {flowSteps.map((step, index) => (
        <div key={index}>
          {/* Flow Step Box */}
          <div
            className="fade-in scale-fade bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            style={{ animationDelay: step.delay }}
          >
            <div className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} mb-1`}>
              {step.label}
            </div>
            <div className="text-sm text-white/60">
              {step.sublabel}
            </div>
          </div>

          {/* Arrow (except for last item) */}
          {index < flowSteps.length - 1 && (
            <div
              className="flex justify-center py-3 fade-in"
              style={{ animationDelay: step.delay }}
            >
              <svg
                className="w-6 h-6 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
