import {
	Text,
	Group,
	Card,
	ActionIcon,
  Checkbox,
} from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

function TaskCard ({index, task, updateTaskStatus, deleteTask}) {
  return (
    <Card withBorder key={index} mt={'sm'}>
      <Group position={'apart'}>
        <Text weight={'bold'}>{task.title}</Text>
        <Group>
          <Checkbox checked={task.checked} onChange={(event) => updateTaskStatus(event.currentTarget.checked, index)}/>
          <ActionIcon
            onClick={() => {
              deleteTask(index);
            }}
            color={'red'}
            variant={'transparent'}>
            <Trash />
          </ActionIcon>
        </Group>
      </Group>
      <Text color={'dimmed'} size={'md'} mt={'sm'}>
        {task.description || ""}
      </Text>
    </Card>
  )
}

export default TaskCard;