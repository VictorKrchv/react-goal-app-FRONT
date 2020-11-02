type GoalState = {
  list: Goal[];
  isLoading: boolean;
  currentGoal: Goal;
  errorMessage: string;
};

type Goal = {
  author: UserData;
  id: number;
  title: string;
  goalCompletion: string;
  description: string;
  plans: PlanItem[];
};

type PlanItem = {
  name: string;
  isComplete: boolean;
  id: number;
};
