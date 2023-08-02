import {
	Button,
	Container,
	Text,
	Title,
	Group,
  Checkbox,
} from '@mantine/core';
import { useState, useEffect } from 'react';

import {
	MantineProvider,
} from '@mantine/core';
import TaskForm from './components/Task/Form';
import TaskCard from './components/Task/TaskCard';

export default function App() {
	const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
	const [opened, setOpened] = useState(false);
  const [completedChecked, setCompletedChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(true);

	function createTask(title, description) {
		setTasks([
			...tasks,
			{
				title,
				description,
        checked: false
			},
		]);

		saveTasks([
			...tasks,
			{
				title,
				description,
        checked: false
			},
		]);
	}

	function deleteTask(index) {
		let clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
	}

	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');

		let tasks = JSON.parse(loadedTasks);

		if (tasks) {
			setTasks(tasks);
		}
	}

	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

  function updateTaskStatus (checked, index) {
    let clonedTasks = [...tasks];

		const updatedTask = tasks[index];
    updatedTask.checked = checked;
    clonedTasks.splice(index, 1, updatedTask);
    
		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
  }

  const updateTasks = () => {
    setCompletedChecked(checked => !checked);
    
  }

	useEffect(() => {
		loadTasks();
	}, []);

  useEffect(() => {
    if (completedChecked) {
      setFilteredTasks(tasks.filter(task => task.checked));
    } else {
      setFilteredTasks(tasks.filter(task => !task.checked));
    }
  }, [completedChecked]);

	return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS>
      <div className='App'>
        <TaskForm opened={opened} setOpened={setOpened} createTask={createTask} />
        <Container size={550} my={40}>
          <Group position={'apart'}>
            <Title
              sx={theme => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}>
              My Tasks
            </Title>
          </Group>
          <Group position={'apart'}>
            <Text size={'lg'} mt={'md'} color={'dimmed'}>
              show
            </Text>
            <Group>
              <Checkbox checked={allChecked} label="All" onChange={() => setAllChecked(checked => !checked)} />
              <Checkbox checked={completedChecked} disabled={allChecked} label="Completed" onChange={() => updateTasks()} />
            </Group>
          </Group>
          {allChecked && tasks.length > 0 ? (
            tasks.map((task, index) => {
              if (task.title) {
                return (
                  <TaskCard index={index} task={task} updateTaskStatus={updateTaskStatus} setOpened={setOpened} deleteTask={deleteTask} />
                );
              }
            })
          ) : tasks.length === 0 && (
            <Text size={'lg'} mt={'md'} color={'dimmed'}>
              You have no tasks
            </Text>
          )}
          {
            !allChecked && filteredTasks.length > 0 && (
              filteredTasks.map((task, index) => {
                if (task.title) {
                  return (
                    <TaskCard index={index} task={task} updateTaskStatus={updateTaskStatus} setOpened={setOpened} deleteTask={deleteTask} />
                  );
                }
              })
            )
          }
          <Button
            onClick={() => {
              setOpened(true);
            }}
            fullWidth
            mt={'md'}>
            New Task
          </Button>
        </Container>
      </div>
    </MantineProvider>
	);
}
