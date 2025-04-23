const CodePageRadio: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="box-border !border-b-0 rounded-t-md h-6 w-20 bg-AC-3 text-text">
          代码1
        </div>
      </div>

      {children}

    </div>

  )
};

export default CodePageRadio;