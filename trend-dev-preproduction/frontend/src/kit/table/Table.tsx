import React, { FC } from "react";
import moment from "moment";
import styles from "./Table.module.scss";

interface TableProps {
  columns?: Array<any>;
  rows?: Array<any>;
  left?: boolean;
  onOpenRow?: () => void;
  noData?: string;
}

const Table: FC<TableProps> = ({
  columns = [],
  rows = [],
  left = false,
  onOpenRow = () => {},
  noData = "No data",
}) => {
  return (
    <div className={styles.table}>
      <table>
        <thead className={styles.header}>
          <tr>
            {columns?.length &&
              columns?.map((column) => {
                if (column.type === "hidden") {
                  return <th className={styles.label} key={column.key} />;
                }
                return (
                  <th className={styles.label} key={column.key}>
                    {column.title}
                  </th>
                );
              })}
          </tr>
        </thead>

        <tbody className={styles.body}>
          {rows?.length
            ? rows?.map((row, index) => {
                const { id = "" } = row;
                return (
                  <tr
                    key={id ? id : index}
                    onDoubleClick={() => {
                      onOpenRow(row);
                    }}
                  >
                    {columns?.length &&
                      columns?.map((column) => {
                        if (column.type === "image") {
                          return (
                            <td key={column.key}>
                              {row[column.key] ? (
                                <div
                                  className={styles.imgWrapper}
                                  style={{
                                    justifyContent: left
                                      ? "flex-start"
                                      : "center",
                                  }}
                                >
                                  <img
                                    src={row[column.key]}
                                    alt={row[column.key]}
                                  />
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                          );
                        }
                        if (column.type === "datetime") {
                          return (
                            <td key={column.key}>
                              {row[column.key]
                                ? moment(row[column.key]).format(
                                    "DD.MM.YYYY, HH:mm",
                                  )
                                : "-"}
                            </td>
                          );
                        }
                        return (
                          <td
                            key={column.key}
                            data-tooltip-id={String(row[column.key])}
                            data-tooltip-content={String(row[column.key])}
                          >
                            {row[column.key] || row[column.key] === 0 ? (
                              <>
                                <span
                                  data-tip={row[column.key]}
                                  data-for={String(row[column.key])}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: row[column.key],
                                    }}
                                  />
                                </span>
                              </>
                            ) : (
                              "-"
                            )}
                          </td>
                        );
                      })}
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>

      {!rows?.length && (
        <div className={styles.empty}>
          <p className={styles.label}>{noData}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
