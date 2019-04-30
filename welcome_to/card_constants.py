from enum import Enum


class Action(Enum):
    SURVEYOR = 1
    REAL_ESTATE_AGENT = 2
    LANDSCAPER = 3
    POOL_MANUFACTURER = 4
    TEMP_AGENCY = 5
    BIS = 6

    @classmethod
    def is_valid(cls, item):
        return any(item == action.value for action in cls)
