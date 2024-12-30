const Copyright = ({ name, text }: { name: string; text: string }) => {
  return (
    <div className="text-[10px] leading-tight text-sidebar-foreground text-center">
      <p className="mb-1">
        ©{new Date().getFullYear()} {name}.
      </p>
      <p className="mb-0">{text}</p>
    </div>
  );
};

export default Copyright;
