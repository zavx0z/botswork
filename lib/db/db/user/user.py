import uuid
from datetime import datetime

from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..chat import Dialog, DialogParticipant
from ..client import Client
from ..shared import Base
from .role import Role


class User(Base):
    __tablename__ = "user"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(length=320), unique=True)

    hashed_password = Column(String(length=1024), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    owner_dialogs = relationship(Dialog, back_populates="owner")
    dialogs = relationship(DialogParticipant, back_populates="user")

    # Поле roles в виде перечисления (enum)
    role = Column(Enum(Role), default=Role.client, nullable=False)
    client = relationship(Client, back_populates="user")

    def __str__(self):
        return self.username

    def __repr__(self):
        return self.__str__()
