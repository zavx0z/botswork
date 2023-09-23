from datetime import datetime

from sqlalchemy import UniqueConstraint, Column, Integer, DateTime, String

from db.shared import Base


class Browser(Base):
    __tablename__ = "browser"
    __table_args__ = (UniqueConstraint('family', 'major', 'minor', 'patch', name='unique_browser'),)

    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    family = Column(String(50), nullable=True)
    major = Column(String(10), nullable=True)
    minor = Column(String(10), nullable=True)
    patch = Column(String(10), nullable=True)

    def __str__(self):
        return f"<Browser: {self.family}\
        {f' v.{self.major}' if self.major else ''}\
        {f'.{self.minor}' if self.minor else ''}\
        {f'.{self.patch}' if self.patch else ''}>"

    def __repr__(self):
        return self.__str__()
