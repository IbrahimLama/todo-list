import react, {useState, useRef} from "react";
import {
	Button,
	Modal,
	TextInput,
	Group,
} from '@mantine/core';
function TaskForm ({opened, setOpened, createTask}) {
	const taskTitle = useRef('');
	const taskDesc = useRef('');

  return (
    <Modal
      opened={opened}
      size={'md'}
      title={'New Task'}
      withCloseButton={false}
      onClose={() => {
        setOpened(false);
      }}
      centered>
      <TextInput
        mt={'md'}
        ref={taskTitle}
        placeholder={'Task Title'}
        required
        label={'Title'}
      />
      <TextInput
        ref={taskDesc}
        mt={'md'}
        placeholder={'Task Description'}
        label={'Description'}
      />
      <Group mt={'md'} position={'apart'}>
        <Button
          onClick={() => {
            setOpened(false);
          }}
          variant={'subtle'}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            createTask(taskTitle.current?.value, taskDesc.current?.value);
            setOpened(false);
          }}>
          Create Task
        </Button>
      </Group>
    </Modal>
  )
}

export default TaskForm;