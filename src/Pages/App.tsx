import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearEmployeeList } from "../store/slices/EmployeeSlice";
import { openModal } from "../store/slices/ModalSlice";
import styles from "./app.module.scss";

function App() {
  const { employeeList } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();
  const downloadHTML = () => {
    if (employeeList.length === 0) {
      alert("Список сотрудников пуст!");
      return;
    }
    const htmlContent = `
      <html>
        <head>
          <title>Список сотрудников</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>Список сотрудников</h1>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Должность</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${employeeList
                .map(
                  (employee) => `
                  <tr>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.position}</td>
                    <td>${employee.email || ""}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee_list.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const printEmployeesList = () => {
    if (employeeList.length === 0) {
      alert("Список сотрудников пуст!");
      return;
    }
    const printContent = `
      <html>
        <head>
          <title>Список сотрудников</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>Список сотрудников</h1>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Должность</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              ${employeeList
                .map(
                  (employee) => `
                  <tr>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.position}</td>
                    <td>${employee.email || ""}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };
  return (
    <main className={styles.app}>
      <section className={styles.btns}>
        <Button
          onClick={() => dispatch(openModal())}
          text="Выбрать сотрудников"
        />
        <Button onClick={printEmployeesList} text="Печать списка" />
        <Button
          onClick={() => dispatch(clearEmployeeList())}
          text="Очистить список"
        />
        <Button onClick={downloadHTML} text="Сохранить файл" />
      </section>
      <section className={styles.employeesList}>
        {employeeList.length === 0 ? (
          <h1>Список сотрудников пуст</h1>
        ) : (
          <h1>Выбранные сотрудники</h1>
        )}
        <ul>
          {employeeList.map((employee) => (
            <li
              key={`${employee.firstName}-${employee.lastName}-${new Date(
                employee.startDate
              ).toLocaleDateString()}`}
            >
              {`${employee.firstName} ${employee.lastName}, ${employee.position}. `}
              {employee.email !== null ? (
                <a
                  href={`mailto:${employee.email}?subject=${encodeURIComponent(
                    "Тема вашего сообщения"
                  )}&body=${encodeURIComponent("Текст вашего сообщения")}`}
                >
                  {employee.email}
                </a>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </section>
      <Modal />
    </main>
  );
}

export default App;
