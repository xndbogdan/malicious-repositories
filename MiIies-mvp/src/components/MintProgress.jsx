const MintProgress = ({ minted, maxTokens }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className="w-full relative"
        style={{ height: "48px", border: "solid black 8px" }}
      >
        <div
          className="bg-red"
          style={{
            width: `${
              minted < maxTokens / 5
                ? (minted / (maxTokens / 5)) * 100
                : (minted / maxTokens) * 100
            }%`,
            height: "100%",
          }}
        ></div>
        {minted < maxTokens / 5 ? (
          <>
            <div
              className="flex justify-center items-center font-console text-xs text-center pt-1"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            >
              {minted} / {maxTokens / 5} GEN 0 MINTED
            </div>
          </>
        ) : (
          <>
            <div
              className="flex justify-center items-center font-console text-xs text-center pt-1"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                borderRight: "solid 4px #7A7A7A",
                width: "20%",
                height: "100%",
              }}
            >
              GEN 0
            </div>
            <div
              className="flex justify-center items-center font-console text-xs text-center pt-1"
              style={{
                position: "absolute",
                top: "0",
                left: "20%",
                borderRight: "solid 4px #7A7A7A",
                width: "20%",
                height: "100%",
              }}
            >
              20,000 $aWOOL
            </div>
            <div
              className="flex justify-center items-center font-console text-xs text-center pt-1"
              style={{
                position: "absolute",
                top: "0",
                left: "40%",
                borderRight: "solid 4px #7A7A7A",
                width: "40%",
                height: "100%",
              }}
            >
              40,000 $aWOOL
            </div>
            <div
              className="flex justify-center items-center font-console text-xs text-center pt-1"
              style={{
                position: "absolute",
                top: "0",
                left: "80%",
                width: "20%",
                height: "100%",
              }}
            >
              80,000 $aWOOL
            </div>

            <div className="font-console mt-2 w-full text-center pt-2">
              {minted} / {maxTokens} MINTED
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MintProgress;
