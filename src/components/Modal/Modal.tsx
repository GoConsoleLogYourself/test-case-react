import styles from "./modal.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../store/slices/ModalSlice";
import { IEmployee } from "../../models/IEmployee";
import { Employees } from "../../utils/Employees";
import Button from "../Button/Button";
import useClickOutside from "../../hooks/useClickOutside";
import { addEmployee } from "../../store/slices/EmployeeSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { employeeList } = useAppSelector((state) => state.employee);
  const { isOpen } = useAppSelector((state) => state.modal);
  const [selectedEmployees, setSelectedEmployees] = useState<IEmployee[]>([]);
  const [sortedEmployees, setSortedEmployees] = useState<IEmployee[]>([]);
  const [employeesWithSubordinates, setEmployeesWithSubordinates] = useState<
    IEmployee[]
  >([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const calculateExperience = (startDate: Date) => {
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += lastMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return years + months / 12;
  };
  useEffect(() => {
    const flattened = flattenEmployees(Employees);
    const sorted = flattened.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );
    setEmployeesWithSubordinates(
      sorted.filter(
        (employee) =>
          !employeeList.some(
            (e) =>
              e.firstName === employee.firstName &&
              e.lastName === employee.lastName &&
              new Date(e.startDate).toLocaleDateString() ===
                employee.startDate.toLocaleDateString()
          )
      )
    );
  }, [employeeList]);
  const flattenEmployees = (employees: IEmployee[]): IEmployee[] => {
    const result: IEmployee[] = [];
    employees.forEach((employee) => {
      result.push(employee);
      if (employee.subordinates) {
        result.push(...flattenEmployees(employee.subordinates));
      }
    });
    return result;
  };
  useClickOutside(modalRef, () => dispatch(closeModal()));
  const toggleEmployeeSelection = (employee: IEmployee) => {
    setSelectedEmployees((prevSelected) => {
      if (
        prevSelected.some(
          (e) =>
            e.firstName === employee.firstName &&
            e.lastName === employee.lastName &&
            e.startDate.toLocaleDateString() ===
              employee.startDate.toLocaleDateString()
        )
      ) {
        return prevSelected.filter(
          (e) =>
            e.firstName !== employee.firstName ||
            e.lastName !== employee.lastName ||
            e.startDate.toLocaleDateString() !==
              employee.startDate.toLocaleDateString()
        );
      } else {
        return [...prevSelected, employee];
      }
    });
  };
  const addSelectedEmployees = () => {
    dispatch(addEmployee(selectedEmployees));
    setSelectedEmployees([]);
    const updatedSortedEmployees = sortedEmployees.filter(
      (employee) =>
        !selectedEmployees.some(
          (e) =>
            e.firstName === employee.firstName &&
            e.lastName === employee.lastName &&
            e.startDate.toLocaleDateString() ===
              employee.startDate.toLocaleDateString()
        )
    );
    setSortedEmployees(updatedSortedEmployees);
    dispatch(closeModal());
  };
  return (
    <div className={isOpen ? styles.modal : styles.none}>
      <div className={styles.container} ref={modalRef}>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Должность</th>
                <th>Дата приёма</th>
                <th>Стаж работы</th>
                <th>Выбрать</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.length === 0
                ? employeesWithSubordinates.map((employee) => (
                    <tr
                      key={`${employee.firstName}-${
                        employee.lastName
                      }-${employee.startDate.toLocaleDateString()}`}
                    >
                      <td
                        className={
                          selectedEmployees.some(
                            (e) =>
                              e.firstName === employee.firstName &&
                              e.lastName === employee.lastName &&
                              e.startDate.toLocaleDateString() ===
                                employee.startDate.toLocaleDateString()
                          )
                            ? styles.checked
                            : ""
                        }
                      >{`${employee.firstName} ${employee.lastName}`}</td>
                      <td
                        className={
                          selectedEmployees.some(
                            (e) =>
                              e.firstName === employee.firstName &&
                              e.lastName === employee.lastName &&
                              e.startDate.toLocaleDateString() ===
                                employee.startDate.toLocaleDateString()
                          )
                            ? styles.checked
                            : ""
                        }
                      >
                        {employee.position}
                      </td>
                      <td
                        className={
                          selectedEmployees.some(
                            (e) =>
                              e.firstName === employee.firstName &&
                              e.lastName === employee.lastName &&
                              e.startDate.toLocaleDateString() ===
                                employee.startDate.toLocaleDateString()
                          )
                            ? styles.checked
                            : ""
                        }
                      >
                        {employee.startDate.toLocaleDateString()}
                      </td>
                      <td
                        className={
                          selectedEmployees.some(
                            (e) =>
                              e.firstName === employee.firstName &&
                              e.lastName === employee.lastName &&
                              e.startDate.toLocaleDateString() ===
                                employee.startDate.toLocaleDateString()
                          )
                            ? styles.checked
                            : ""
                        }
                      >
                        {calculateExperience(employee.startDate).toFixed(1)}
                      </td>
                      <td
                        className={
                          selectedEmployees.some(
                            (e) =>
                              e.firstName === employee.firstName &&
                              e.lastName === employee.lastName &&
                              e.startDate.toLocaleDateString() ===
                                employee.startDate.toLocaleDateString()
                          )
                            ? styles.checked
                            : ""
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedEmployees.some(
                            (e) =>
                              e.firstName === employee.firstName &&
                              e.lastName === employee.lastName &&
                              e.startDate.toLocaleDateString() ===
                                employee.startDate.toLocaleDateString()
                          )}
                          onChange={() => toggleEmployeeSelection(employee)}
                        />
                      </td>
                    </tr>
                  ))
                : sortedEmployees.map((employee) => (
                    <tr
                      key={`${employee.firstName}-${employee.lastName}-${employee.position}`}
                    >
                      <td>{`${employee.firstName} ${employee.lastName}`}</td>
                      <td>{employee.position}</td>
                      <td>{employee.startDate.toDateString()}</td>
                      <td>
                        {calculateExperience(employee.startDate).toFixed(1)}
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <Button
          disabled={selectedEmployees.length === 0 ? true : false}
          onClick={addSelectedEmployees}
          text="Выбрать"
        />
        <div
          onClick={() => dispatch(closeModal())}
          className={styles.close}
        ></div>
      </div>
    </div>
  );
};

export default Modal;
