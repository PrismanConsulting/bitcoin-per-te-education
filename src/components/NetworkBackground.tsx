const NetworkBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-[15%] left-[10%] w-48 h-48 rounded-full bg-primary/5 blur-[80px]" />
      <div className="absolute top-[60%] right-[8%] w-64 h-64 rounded-full bg-primary/4 blur-[100px]" />
      <div className="absolute bottom-[20%] left-[30%] w-40 h-40 rounded-full bg-primary/3 blur-[70px]" />
      <div className="absolute top-[5%] right-[25%] w-32 h-32 rounded-full bg-primary/4 blur-[60px]" />
      <div className="absolute bottom-[10%] right-[40%] w-56 h-56 rounded-full bg-primary/3 blur-[90px]" />
    </div>
  );
};

export default NetworkBackground;
