from welcome_to.cards.card_constants import Action


class Card:
    """
    Represents a Welcome To card.
    """

    def __init__(self, value, action):
        """
        Card constructor. Requires an address value (1-15) and an action.

        :param value: The card's address value (1-15).
        :param action: The action on the flip side of the card.
        """
        if value > 15 or value < 0 or not Action.is_valid(action):
            raise ValueError("Invalid card value or action.")
        self.value = value
        self.action = action

    def get_value(self):
        return self.value

    def get_action(self):
        return self.action

