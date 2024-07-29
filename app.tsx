interface Employee {
  firstName: string;
  lastName: string;
  position: string;
  startDate: Date;
  email: string | null;
  subordinates: Employee[] | null;
}

const initialEmployees: Employee[] = [
  // (Вставьте сюда данные сотрудников из вашего примера)
];

const App: React.FC = () => {
  const [employees] = useState(initialEmployees);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedSelected = localStorage.getItem("selectedEmployees");
    if (savedSelected) {
      setSelectedEmployees(JSON.parse(savedSelected));
    }
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const addSelectedEmployees = (newEmployees: Employee[]) => {
    setSelectedEmployees((current) => {
      const updated = [...current, ...newEmployees];
      localStorage.setItem("selectedEmployees", JSON.stringify(updated));
      return updated;
    });
    toggleModal();
  };

  const clearSelectedEmployees = () => {
    setSelectedEmployees([]);
    localStorage.removeItem("selectedEmployees");
  };

  return (
    <div className="app">
      <h1>Employee Selector</h1>
      <button onClick={toggleModal}>Выбрать сотрудников</button>
      <button onClick={() => window.print()}>Печать списка</button>
      <button onClick={clearSelectedEmployees}>Очистить список</button>
      <button
        onClick={() => {
          /* Добавьте логику для сохранения файла */
        }}
      >
        Сохранить файл
      </button>

      <SelectedEmployees employees={selectedEmployees} />

      {showModal && (
        <EmployeeModal
          employees={employees}
          selectedEmployees={selectedEmployees}
          onSelectEmployees={addSelectedEmployees}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default App;

**Создайте компонент для отображения списка выбранных сотрудников**:

tsx
   // src/components/SelectedEmployees.tsx
   import React from 'react';
   
   interface Employee {
     firstName: string;
     lastName: string;
     email: string | null;
   }

   interface SelectedEmployeesProps {
     employees: Employee[];
   }

   const SelectedEmployees: React.FC<SelectedEmployeesProps> = ({ employees }) => {
     return (
       <div>
         {employees.length > 0 ? (
           <div>
             <h2>Выбранные сотрудники</h2>
             <ul>
               {employees.map((employee, index) => (
                 <li key={index}>
                   {employee.firstName} {employee.lastName} - 
                   {employee.email && (
                     <a href={`mailto:${employee.email}`}>{employee.email}</a>
                   )}
                 </li>
               ))}
             </ul>
           </div>
         ) : (
           <div>Нет выбранных сотрудников</div>
         )}
       </div>
     );
   };

   export default SelectedEmployees;
   


6. **Создайте модальное окно для выбора сотрудников**:

tsx
   // src/components/EmployeeModal.tsx
   import React, { useState } from 'react';

   interface Employee {
     firstName: string;
     lastName: string;
     position: string;
     startDate: Date;
     email: string | null;
   }

   interface EmployeeModalProps {
     employees: Employee[];
     selectedEmployees: Employee[];
     onSelectEmployees: (newEmployees: Employee[]) => void;
     onClose: () => void;
   }

   const EmployeeModal: React.FC<EmployeeModalProps> = ({ employees, selectedEmployees, onSelectEmployees, onClose }) => {
     const [selected, setSelected] = useState<Employee[]>([]);

     const toggleSelect = (employee: Employee) => {
       if (selected.includes(employee)) {
         setSelected(selected.filter(e => e !== employee));
       } else {
         setSelected([...selected, employee]);
       }
     };

     const handleSubmit = () => {
       const uniqueSelected = selected.filter(newEmployee => 
         !selectedEmployees.includes(newEmployee)
       );
       onSelectEmployees(uniqueSelected);
     };

     return (
       <div className="modal">
         <h2>Выбор сотрудников</h2>
         <button onClick={onClose}>Закрыть</button>
         <table>
           <thead>
             <tr>
               <th>Выбрать</th>
               <th>ФИО</th>
               <th>Должность</th>
               <th>Дата приема</th>
             </tr>
           </thead>
           <tbody>
             {employees.map((employee, index) => (
               <tr key={index} onClick={() => toggleSelect(employee)}>
                 <td>
                   <input 
                     type="checkbox" 
                     checked={selected.includes(employee)} 
                     onChange={() => toggleSelect(employee)} 
                   />
                 </td>
                 <td>{employee.firstName} {employee.lastName}</td>
                 <td>{employee.position}</td>
                 <td>{employee.startDate.toLocaleDateString()}</td>
               </tr>
             ))}
           </tbody>
         </table>
         <button onClick={handleSubmit} disabled={selected.length === 0}>Отправить</button>
       </div>
     );
   };

   export default EmployeeModal;
   


7. **Добавьте стили в файл SCSS**:

scss
   // src/styles/styles.scss
   .app {
     text-align: center;
     button {
       margin: 5px;
       padding: 10px 15px;
       border: none;
       background-color: #007bff;
       color: white;
       font-size: 16px;
       cursor: pointer;
       transition: all 0.3s;
       &:hover {
         background-color: #0056b3;
       }
       &:active {
         transform: scale(0.95);
       }
     }
   }

   .modal {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex;
     align-items: center;
     justify-content: center;
     .modal-content {
       background-color: white;
       padding: 20px;
       border-radius: 5px;
     }
   }

   table {
     width: 100%;
     th, td {
       padding: 10px;
       border: 1px solid #ddd;
     }
   }
   