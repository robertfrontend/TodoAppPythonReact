from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import Text


class TaskModel(BaseModel):
    id: Optional[str]
    name: str
    description: Text
    status: str
    priority: str
    created_at: datetime = datetime.now()
    delete: bool = False
