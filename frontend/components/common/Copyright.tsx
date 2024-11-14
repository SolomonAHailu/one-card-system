// const Copyright = () => {
//   return <div> © {new Date().getFullYear()} Convergence </div>;
// };

// export default Copyright;
const Copyright = ({ name }: any) => {
  return (
    <div className="text-xs text-sidebar-foreground text-center">
      <p>
        ©{new Date().getFullYear()} {name}.
      </p>
      All rights reserved.
    </div>
  );
};

export default Copyright;
