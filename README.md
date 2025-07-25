# My Day, My Way 🗓️🍅✨

A cozy, pastel-themed workday organizer with task management, Eisenhower matrix prioritization, customizable Pomodoro scheduling, drag-and-drop task reordering, recurring tasks, and delightful celebration animations to keep you motivated!

![Screenshot of Main page View](images/base_ui.png)

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [How to Use](#how-to-use)  
  - [Adding Tasks](#adding-tasks)  
  - [Organizing Tasks with the Eisenhower Matrix](#organizing-tasks-with-the-eisenhower-matrix)  
  - [Scheduling Pomodoro Sessions](#scheduling-pomodoro-sessions)  
  - [Managing Recurring Tasks](#managing-recurring-tasks)  
  - [Marking Tasks as Complete](#marking-tasks-as-complete)  
  - [Celebrating Your Day](#celebrating-your-day)  
- [Settings & Customization](#settings--customization)  
- [Sound Effects](#sound-effects)  
- [Known Issues](#known-issues)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

**My Day, My Way** helps you organize your workday by combining:

- A simple task list with time organized by amount of pomodoros a task will take
- An Eisenhower matrix to prioritize by urgency & importance  
- A drag-and-drop interface for organizing tasks easily  
- Customizable Pomodoro amounts and break lengths  
- Recurring tasks to save time on daily routines  
- A fun celebration page with confetti and sounds when you finish your day!

The whole experience is designed with a warm, cozy pastel aesthetic to keep your workflow fun!

---

## Features

- **Add tasks** with adjustable Pomodoro counts (1–5)  
- **Organize tasks** into 4 Eisenhower quadrants (Important/Urgent, Important/Not Urgent, etc.) with drag-and-drop  
- **Generate a Pomodoro schedule** prioritized by task importance and urgency  
- **Drag and drop** tasks within the schedule to reorder or swap tasks easily  
- **Partial schedule update** starting from current time, skipping completed tasks  
- **Mark tasks complete** with checkboxes that update your lists on next schedule update 
- **Recurring tasks**: save, favorite, add to today with one click  
- **Daily celebration page** with confetti and sounds to reward progress  
- **Custom Pomodoro settings**: number of Pomodoros before a long break, length of breaks, start and end of your workday  
- **Sound toggle** to enable/disable cute sound effects  
- **Smooth page transitions**
- **Persistent data storage** via `localStorage` — your tasks and settings save across browser sessions

---

## Getting Started

Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

No installation required!

---

## How to Use

### Adding Tasks

![Screenshot of Adding Tasks](images/adding_tasks.png)

![Screenshot of Setting Pomodoros](images/setting_pomodoros.png)

1. Type your task into the input field on the **Task Page**.  
2. Click the **"+" button** or press Enter.  
3. Each task defaults to 1 Pomodoro 🍅 but you can adjust that later.
4. Tasks appear in your task list ready for organization.

> Note: If you've already organized your tasks into the Eisenhower Matrix, new tasks won’t immediately appear in the list. Use “Organize Tasks” again to place them randomly in a quadrant, or refresh the page to reset and adjust Pomodoros before organizing.

### Organizing Tasks with the Eisenhower Matrix

![Organize Tasks Screenshot](images/organize_tasks.png)

- Click **"Organize Tasks 🧠"** to reveal the Eisenhower matrix with four quadrants:  
  - Important & Urgent  
  - Important & Not Urgent  
  - Not Important & Urgent  
  - Not Important & Not Urgent  
- Your tasks will be randomly assigned to quadrants initially.
- Drag and drop tasks between quadrants to prioritize your day exactly how you want.
- Set prioritizations persist when tasks are reorganized  
- This matrix guides the Pomodoro schedule generation by priority.

### Scheduling Pomodoro Sessions

![Schedule Page Screenshot](images/schedule_page.png)

- Click **"Go to Schedule ⏱️"** to view your Pomodoro schedule.  
- Use the **Pomodoro Settings** to adjust:  
  - Number of Pomodoros before a long break  
  - Length of long breaks  
  - Start and end times for your day  
- Click **"Generate Schedule"** to create your Pomodoro timeline based on your prioritized tasks.  
- Drag and drop task cards in the schedule to reorder or swap tasks easily.
  ![Partial Schedule Update Screenshot](images/partial_schedule_update.png)
- Click **"Partial Schedule Update"** to re-generate the schedule starting from the current time, skipping completed tasks.

### Managing Recurring Tasks

![Recurring Tasks Page](images/recurring_tasks_page.png)

- Click the **"📋 Recurring"** button (bottom right) to open the Recurring Tasks panel.  
- Add tasks you do often, assign quadrants and Pomodoro counts.  
- Favorite recurring tasks with ❤️ to sort them to the top.  
- Add any recurring task to today’s tasks with one click.  
- Manage recurring tasks by deleting or toggling favorites.
- Recurring tasks are not deleted when the day is reset

### Marking Tasks as Complete

![Marked Complete Screenshot](images/marked_complete.png)

- On both the Schedule pages, checkboxes let you mark tasks complete.  
- Completed tasks are automatically moved out of the main task list and scheduled out.  
- The task card color changes to visually confirm completion.

### Celebrating Your Day

![Completed Day Page Screenshot](images/completed_day.png)

- When you’re done, click **"🎉 Complete Day"** on the Schedule page.  
- This shows a celebration page with a congratulatory message, a list of completed tasks, and a confetti burst.
![Reset Day Button](images/reset_day.png)
- Click **"🌅 Finish Day"** to confirm and clear all tasks for a fresh start tomorrow.
- This clears all daily tasks but leaves recurring tasks intact
![Recurring Tasks Remain After Reset Screenshot](images/recurring_tasks_remain.png)

---

## Settings & Customization

- **Sound Toggle:** Top-left 🔊 button mutes/unmutes all sound effects.  
- **Pomodoro Settings:** Customize session lengths and breaks to fit your workflow.  
- **Day Start/End:** Set your working hours to tailor the schedule.  
- **Drag & Drop:** Rearrange tasks anywhere with natural drag-and-drop support.  

---

## Sound Effects

The app uses gentle, cute sound effects for:

- Adding a task  
- Completing a task  
- Moving tasks via drag and drop  
- Celebrating the completion of your day  

Sounds can be toggled on/off anytime.

---

## Known Issues

- Occasionally, page transition animations may feel abrupt depending on browser performance.  
- Task deletion and schedule updates reload the task list for data consistency.  
- Drag and drop swapping in schedule is implemented but may need a refresh to update state fully.

---

## Contributing

Feel free to fork this project, suggest improvements, or submit pull requests!  
I welcome feature requests or bug reports via GitHub issues.

---

## License

MIT License — free to use and modify with attribution.  
See the [LICENSE](LICENSE) file for details.

---

# Thank you for using **My Day, My Way**!  
May your days be productive and cozy 🌸🍅
